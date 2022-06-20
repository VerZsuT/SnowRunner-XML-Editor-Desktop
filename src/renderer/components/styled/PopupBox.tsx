import { Box, BoxProps, styled } from "@mui/material";

export default styled((props: BoxProps) => {
    return <Box boxShadow={24} {...props} />;
})({
    display: "inline-block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "5px",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "15px",
    paddingLeft: "10px",
    paddingRight: "10px"
});
