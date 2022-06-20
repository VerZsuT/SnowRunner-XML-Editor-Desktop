import useConst from "hooks/useConst";

/** Предоставляет уникальный id компонента */
export default () => useConst(`component-${Math.round(Math.random() * 100000)}`);
