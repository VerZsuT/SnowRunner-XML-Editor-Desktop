import { AccordionSummaryProps, styled, AccordionSummary as MuiAccordionSummary } from "@mui/material";
import ArrowForward from "./ArrowForward";

export default styled((props: AccordionSummaryProps) =>
    <MuiAccordionSummary expandIcon={<ArrowForward />} {...props} />
)({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(90deg)" }
});
