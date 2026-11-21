//! Метаданные записи zip-архива, сигнатуры формата и DOS-время.

use std::time::{SystemTime, UNIX_EPOCH};

/// Сигнатура локального заголовка.
pub(super) const LOCAL_FILE_HEADER_SIGNATURE: u32 = 0x0403_4b50;

/// Сигнатура записи central directory.
pub(super) const CENTRAL_DIRECTORY_SIGNATURE: u32 = 0x0201_4b50;

/// Сигнатура конца central directory.
pub(super) const END_OF_CENTRAL_DIRECTORY_SIGNATURE: u32 = 0x0605_4b50;

/// Сигнатура локатора zip64 (признак zip64-архива).
pub(super) const ZIP64_LOCATOR_SIGNATURE: u32 = 0x0706_4b50;

/// Метод сжатия «без сжатия».
pub(super) const METHOD_STORED: u16 = 0;

/// Метод сжатия raw deflate.
pub(super) const METHOD_DEFLATE: u16 = 8;

/// Флаг «после данных идёт data descriptor».
pub(super) const DATA_DESCRIPTOR_FLAG: u16 = 0x0008;

/// Секунд в сутках.
const SECONDS_PER_DAY: u64 = 86_400;

/// Минимальный год, представимый в DOS-формате.
const DOS_MIN_YEAR: i64 = 1980;

/// Максимальный год, представимый в DOS-формате.
const DOS_MAX_YEAR: i64 = 2107;

/// Метаданные записи zip-архива.
///
/// Все значения взяты из central directory без нормализации: имя — сырые байты
/// UTF-8 (обратные слэши сохраняются), дата и время — в формате DOS.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EntryMeta {
	/// Имя записи как в архиве, с обратными слэшами.
	pub name: String,
	/// Метод сжатия: 0 — stored, 8 — deflate.
	pub method: u16,
	/// CRC32 распакованных данных.
	pub crc32: u32,
	/// Размер сжатых данных в байтах.
	pub compressed_size: u64,
	/// Размер распакованных данных в байтах.
	pub uncompressed_size: u64,
	/// Флаги записи из central directory.
	pub flags: u16,
	/// Время в формате DOS.
	pub dos_time: u16,
	/// Дата в формате DOS.
	pub dos_date: u16,
	/// Версия создателя записи.
	pub version_made_by: u16,
	/// Минимальная версия для распаковки.
	pub version_needed: u16,
	/// Внутренние атрибуты записи.
	pub internal_attrs: u16,
	/// Внешние атрибуты записи.
	pub external_attrs: u32,
	/// Офсет сжатых данных в файле архива.
	pub data_offset: u64,
	/// Офсет локального заголовка в файле архива.
	pub local_header_offset: u64,
}

impl EntryMeta {
	/// Является ли запись каталогом (имя заканчивается разделителем).
	pub fn is_directory(&self) -> bool {
		self.name.ends_with('\\') || self.name.ends_with('/')
	}
}

/// Посчитать CRC32 данных.
pub(super) fn checksum(data: &[u8]) -> u32 {
	crc32fast::hash(data)
}

/// Получить пару (время, дата) DOS для текущего момента.
///
/// В стандартной библиотеке Rust нет безопасного доступа к локальной зоне,
/// поэтому берётся системное время в UTC; DOS-время служит только метаданными
/// и не влияет на чтение архива игрой.
pub(super) fn current_dos_datetime() -> (u16, u16) {
	let seconds = SystemTime::now()
		.duration_since(UNIX_EPOCH)
		.map(|value| value.as_secs())
		.unwrap_or(0);
	dos_datetime(seconds)
}

/// Преобразовать секунды UNIX в пару (время, дата) формата DOS.
///
/// Секунды округляются вниз до двух секунд — такова гранулярность DOS-времени.
pub(super) fn dos_datetime(unix_seconds: u64) -> (u16, u16) {
	let days = unix_seconds / SECONDS_PER_DAY;
	let seconds_of_day = unix_seconds % SECONDS_PER_DAY;
	let (year, month, day) = civil_from_days(days);
	if year < DOS_MIN_YEAR {
		return (0, (1 << 5) | 1);
	}
	if year > DOS_MAX_YEAR {
		let year = (DOS_MAX_YEAR - DOS_MIN_YEAR) as u16;
		return (0, (year << 9) | (12 << 5) | 31);
	}
	let hour = (seconds_of_day / 3_600) as u16;
	let minute = ((seconds_of_day % 3_600) / 60) as u16;
	let second = (seconds_of_day % 60) as u16;
	let year = (year - DOS_MIN_YEAR) as u16;
	let date = (year << 9) | ((month as u16) << 5) | (day as u16);
	let time = (hour << 11) | (minute << 5) | (second / 2);
	(time, date)
}

/// Перевести число дней от UNIX-эпохи в календарную дату (алгоритм Хиннанта).
fn civil_from_days(days: u64) -> (i64, u32, u32) {
	let z = days as i64 + 719_468;
	let era = z.div_euclid(146_097);
	let day_of_era = z.rem_euclid(146_097);
	let year_of_era =
		(day_of_era - day_of_era / 1_460 + day_of_era / 36_524 - day_of_era / 146_096) / 365;
	let year = year_of_era + era * 400;
	let day_of_year = day_of_era - (365 * year_of_era + year_of_era / 4 - year_of_era / 100);
	let month_index = (5 * day_of_year + 2) / 153;
	let day = (day_of_year - (153 * month_index + 2) / 5 + 1) as u32;
	let month = if month_index < 10 {
		(month_index + 3) as u32
	} else {
		(month_index - 9) as u32
	};
	let year = if month <= 2 { year + 1 } else { year };
	(year, month, day)
}

#[cfg(test)]
mod tests {
	use super::dos_datetime;

	/// Известные даты и гранулярность DOS-времени.
	#[test]
	fn dos_datetime_known_dates() {
		// 1980-01-01T00:00:00Z — начало DOS-эпохи.
		assert_eq!(dos_datetime(315_532_800), (0, (1 << 5) | 1));
		// 2024-01-01T00:00:00Z.
		assert_eq!(dos_datetime(1_704_067_200), (0, (44 << 9) | (1 << 5) | 1));
		// 2024-01-01T23:59:59Z: секунды усекаются до чётных (59 / 2 = 29).
		let late = 1_704_067_200 + 23 * 3_600 + 59 * 60 + 59;
		assert_eq!(
			dos_datetime(late),
			((23 << 11) | (59 << 5) | 29, (44 << 9) | (1 << 5) | 1)
		);
		// Двухсекундная гранулярность.
		assert_eq!(dos_datetime(1_704_067_200).0, 0);
		assert_eq!(dos_datetime(1_704_067_201).0, 0);
		assert_eq!(dos_datetime(1_704_067_202).0, 1);
	}
}
