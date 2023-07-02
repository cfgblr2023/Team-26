import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function MiniStatisticsCard({ bgColor, title, count, direction }) {
  return (
    <Card>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <SoftBox
                  variant="gradient"
                  bgColor="white"
                  width="10rem"
                  height="4rem"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                </SoftBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SoftTypography
                  variant="button"
                  color="black"
                  opacity="white"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {title.text}{"\n"}
                </SoftTypography>
                <SoftTypography
                  variant="h7"
                  color="black"
                >
                  {count}
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
