import type TemplateType from "../enums/TemplateType";
import type TSelectors from "./TSelectors";

type TTemplateClassProps = {
    /**
     * Тип шаблона.
     * 
     * @default TemplateType.single
    */
    type?: TemplateType
    /**
     * Селектор итерируемых элементов.
     * 
     * Работает только при {@link type}=`TemplateType.multiply`
    */
    itemSelector?: string
    /**
     * Селекторы, используемые у потомков шаблона.
     * 
     * Устанавливается у `root` шаблона.
    */
    selectors?: TSelectors
}

export default TTemplateClassProps;
