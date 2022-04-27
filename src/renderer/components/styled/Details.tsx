import { styled, AccordionDetails as MuiAccordionDetails } from "@mui/material";

export default styled(MuiAccordionDetails)({
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: "6px",
    "> .MuiPaper-root:last-child": { marginBottom: "10px" },
    "> .MuiPaper-root": {
        marginLeft: "10px",
        marginRight: "10px"
    }
});
