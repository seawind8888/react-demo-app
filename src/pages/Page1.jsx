import React, { useState } from "react";
import { Button } from '@tarojs/components/dist-h5/react';
import { CoAlert } from "../h5";

const Page1 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div style={{ height: "100vh" }}>
      <Button type="primary">123</Button>
      <CoAlert
          visible={visible}
          controls={[
            {
              title: "取消1",
              onClick: () => {
                setVisible(false)
              }
            },
            {
              title: "确定",
              onClick: () => {
                console.log("success");
              },
              textColor: "#FE5000"
            }
          ]}
        ></CoAlert>
    </div>
  );
};
export default Page1;
