import { Box, Typography } from "@material-ui/core";
import React from "react";

const Home = () => {
  return (
    <div>
      <Typography variant="h6">Kho hàng của chúng tôi</Typography>
      <Box>
        <img src="repo.jpg" alt="repo" />
      </Box>
      <Box>
        <Typography variant="h4">Giới thiệu về sản phẩm</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
          exercitationem, amet vero nisi magnam soluta facere. Voluptates
          aspernatur mollitia expedita eos ex ipsam sequi eaque, obcaecati
          tempore praesentium! Magnam!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4">Các tính năng</Typography>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            fontWeight: 500,
          }}
        >
          + Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
          exercitationem, amet vero nisi magnam soluta facere. Voluptates
          aspernatur mollitia expedita eos ex ipsam sequi eaque, obcaecati
          tempore praesentium! Magnam!
        </Typography>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            fontWeight: 500,
          }}
        >
          + Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
          exercitationem, amet vero nisi magnam soluta facere. Voluptates
          aspernatur mollitia expedita eos ex ipsam sequi eaque, obcaecati
          tempore praesentium! Magnam!
        </Typography>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            fontWeight: 500,
          }}
        >
          + Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
          exercitationem, amet vero nisi magnam soluta facere. Voluptates
          aspernatur mollitia expedita eos ex ipsam sequi eaque, obcaecati
          tempore praesentium! Magnam!
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
