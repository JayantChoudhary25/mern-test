import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import style from "../Css/admin.module.css";
import Graph1 from "./Graphs/graph1";
import Graph2 from "./Graphs/graph2";
import Graph3 from "./Graphs/graph3";

import '../Css/style.css'


export const GraphsPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`p-md-4 p-2 ${style.graph_main}`}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <div className={`mb-4 px-2 ${style.top_section}`}>
            <h6 className="mb-0">Graphical Representation </h6>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="User per month" value="1" />
                <Tab label="Product selected" value="2" />
                <Tab label="Users not selected any product" value="3" />
              </TabList>
            </Box>
          </div>
          <TabPanel value="1"> <Graph1 /> </TabPanel>
          <TabPanel value="2"> <Graph2 /> </TabPanel>
          <TabPanel value="3"> <Graph3 /> </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
