#define MyAppName "SnowRunnerXMLEditor"
#define MyAppVersion "0.6.8"
#define MyAppPublisher "VerZsuT"
#define MyAppURL "https://snowrunner.mod.io/guides/snowrunner-xml-editor/"
#define MyAppExeName "SnowRunner XML Editor.exe"

[Setup]
AppId={{A9C12A97-351E-453E-B121-A2B1A1D5B56D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputDir="..\out"
OutputBaseFilename={#MyAppName}
SetupIconFile="..\out\{#MyAppName}\resources\app\.webpack\main\favicon.ico"
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=lowest

[Languages]
Name: "english"; MessagesFile: "Default.isl"
Name: "german"; MessagesFile: "German.isl"
Name: "russian"; MessagesFile: "Russian.isl"

[Files]
Source: "..\out\{#MyAppName}\resources\app\.webpack\main\config.json"; DestDir: "{app}"; BeforeInstall: MigrateConfig; Flags: ignoreversion
Source: "..\out\{#MyAppName}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{userdesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; AfterInstall: SetElevationBit('{userdesktop}\{#MyAppName}.lnk')
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; AfterInstall: SetElevationBit('{group}\{#MyAppName}.lnk')
Name: "{group}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent runascurrentuser

[UninstallDelete]
Name: "{app}\resources\app"; Type: filesandordirs

[Code]
procedure SetElevationBit(Filename: string);
var
  Buffer: string;
  Stream: TStream;
begin
  Filename := ExpandConstant(Filename);

  Stream := TFileStream.Create(FileName, fmOpenReadWrite);
  try
    Stream.Seek(21, soFromBeginning);
    SetLength(Buffer, 1);
    Stream.ReadBuffer(Buffer, 1);
    Buffer[1] := Chr(Ord(Buffer[1]) or $20);
    Stream.Seek(-1, soFromCurrent);
    Stream.WriteBuffer(Buffer, 1);
  finally
    Stream.Free;
  end;
end;

procedure MigrateConfig;
var
  ConfigPath: string;
  BackupConfigPath: string;
begin
  ConfigPath := WizardDirValue() + '\resources\app\.webpack\main\config.json';
  BackupConfigPath := WizardDirValue() + '\resources\app\.webpack\main\backups\config.json';
  
  if FileExists(ConfigPath) then
    FileCopy(ConfigPath, BackupConfigPath, False);
end;
