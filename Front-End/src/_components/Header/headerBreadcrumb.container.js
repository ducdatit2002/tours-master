import React, { Component } from "react";

import { Breadcrumb, Icon, Typography } from "antd";

const { Text, Paragraph } = Typography;

export default class HeaderBreadcrumbContainer extends Component {
   render() {
      return (
         <div className="container">
            <div className="row justify-content-center ht-breadcrumb-container">
               <div className="col-md-12 col-lg-6">
                  <Breadcrumb>
                     <Breadcrumb.Item href="">
                        <Icon type="home" />
                     </Breadcrumb.Item>
                     <Breadcrumb.Item href="">
                        <span>Tours</span>
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                  </Breadcrumb>
               </div>
               <div className="col-md-12 col-lg-6 text-right">
                  <Text>
                     <Paragraph
                        copyable={{ text: "+84983982933" }}
                        className="ht-no-p-m"
                     >
                        Call us: {`+84 983 982 933`}
                     </Paragraph>
                  </Text>
               </div>
            </div>
         </div>
      );
   }
}
