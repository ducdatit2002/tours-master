import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Input, DatePicker, Select, Button, Icon, AutoComplete } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { OptGroup } = AutoComplete;
const OptionComplete = AutoComplete.Option;
const dateFormat = "DD/MM/YYYY";

const dataSourceAll = [
   {
      title: "Trùm Tour",
      children: [
         {
            title: "Tết Nguyên Đán",
            count: 100,
         },
         {
            title: "Năm mới 2020",
            count: 1060,
         },
         {
            title: "Mùa hoa anh đào nở",
            count: 2,
         },
      ],
   },
   {
      title: "Địa danh",
      children: [
         {
            title: "Thung lũng tình yêu",
            count: 601,
         },
         {
            title: "Hạ Long bay",
            count: 300,
         },
      ],
   },
   {
      title: "Địa chỉ",
      children: [
         {
            title: "Thành phố Đà Lạt",
            count: 150,
         },

         {
            title: "Tokyo",
            count: 254,
         },
      ],
   },
];

export default class SearchEngineContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         keySearch: " ",
         dayStart: "2019-1-1",
         dayEnd: "2030-12-12",
         conditional: "all",
         dataSource: [],
         dataSourceAll: dataSourceAll,
         onSearch: false,
         // Responsize antd component
         sizeWindow: "",
      };
   }

   //Auto complete search key

   handleSearch = (value) => {
      this.setState({
         dataSource: value ? this.searchResult(value) : [],
      });
   };

   onSelect(value) {
      // console.log("onSelect", value);
   }

   getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
   }

   searchResult(query) {
      return new Array(this.getRandomInt(5))
         .join(".")
         .split(".")
         .map((item, idx) => ({
            query,
            category: `${query}${idx}`,
            count: this.getRandomInt(200, 100),
         }));
   }

   renderOption(item) {
      return (
         <Option key={item.category} text={item.category}>
            <div className="global-search-item">
               <span className="global-search-item-desc">
                  Your mind: {item.query}
               </span>
               <span className="global-search-item-count">
                  {" "}
                  {item.count} results
               </span>
            </div>
         </Option>
      );
   }

   getCurrentDay = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      return today;
   };

   onChangeConditional = (value) => {
      this.setState({ conditional: value });
   };
   onChangeKeySearch = (value) => {
      this.setState({ keySearch: value });
   };
   onChangeDay = (moment) => {
      if (moment[0] !== undefined) {
         const dayStartTemp = moment[0].format("YYYY-MM-DD");
         const dayEndTemp = moment[1].format("YYYY-MM-DD");
         //day start
         this.setState({ dayStart: dayStartTemp });
         //day end
         this.setState({ dayEnd: dayEndTemp });
      }
   };

   onBlur = () => {
      // console.log("blur");
   };

   onFocus = () => {
      // console.log("focus");
   };

   onSearch = (event) => {
      event.preventDefault();
      this.setState({ onSearch: true });
      const { keySearch, dayStart, dayEnd, conditional } = this.state;
      this.props.handleSearch({
         keySearch: keySearch,
         dayStart,
         dayEnd,
         conditional,
      });
   };

   renderTitle(title) {
      return (
         <span>
            {title}
            <Link style={{ float: "right" }} to="/tour">
               more
            </Link>
         </span>
      );
   }

   options() {
      let options = this.state.dataSourceAll
         .map((group) => (
            <OptGroup key={group.title} label={this.renderTitle(group.title)}>
               {group.children.map((opt) => (
                  <OptionComplete key={opt.title} value={opt.title}>
                     {opt.title}
                     <span className="certain-search-item-count">
                        {opt.count} people
                     </span>
                  </OptionComplete>
               ))}
            </OptGroup>
         ))
         .concat([
            <Option disabled key="all" className="show-all">
               <Link to="/tour">View all results</Link>
            </Option>,
         ]);
      return options;
   }

   disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
   }

   componentWillMount() {
      this.setState({
         sizeWindow: window.innerWidth > 767.98 ? "default" : "small",
      });
   }
   l;
   render() {
      const { dataSource, sizeWindow } = this.state;
      return (
         <div className="container">
            <div className="row">
               <div className="col-md-12 ht-no-p-l">
                  <div className="col-md ht-no-p-l mt-2">
                     <div className="ht-d-flex-center-center ht-search-tour-page p-2">
                        <h6 className="ht-no-p-m">Tìm Kiếm</h6>
                     </div>
                     <div className="form-group">
                        <div className="certain-category-search-wrapperht-width100">
                           <AutoComplete
                              className="certain-category-search ht-width100"
                              dropdownClassName="certain-category-search-dropdown"
                              size={sizeWindow}
                              style={{
                                 width: "100%",
                              }}
                              dataSource={
                                 this.state.keySearch === "" &&
                                 this.state.conditional === "all"
                                    ? this.options()
                                    : dataSource.map(this.renderOption)
                              }
                              onSelect={this.onSelect}
                              onSearch={this.handleSearch}
                              dropdownMatchSelectWidth={false}
                              placeholder="Nhấp zô??? Có gợi ý cho bạn nè!"
                              optionLabelProp="value"
                              onChange={this.onChangeKeySearch}
                           >
                              <Input
                                 className="ht-width100"
                                 suffix={
                                    <Icon
                                       type="question-circle"
                                       theme="filled"
                                       className="certain-category-icon"
                                    />
                                 }
                              />
                           </AutoComplete>
                        </div>
                     </div>
                  </div>
                  <div className="col-md ht-no-p-l ">
                     <div className="form-group">
                        <div className="form-field">
                           <RangePicker
                              size={sizeWindow}
                              className="ht-width100"
                              disabledDate={this.disabledDate}
                              defaultValue={[
                                 moment(this.getCurrentDay(), dateFormat),
                                 moment("12/12/2030", dateFormat),
                              ]}
                              onChange={this.onChangeDay}
                              format={dateFormat}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="col-md ht-no-p-l">
                     <div className="form-group">
                        <div className="form-field">
                           <div className="select-wrap">
                              <Select
                                 showSearch
                                 size={sizeWindow}
                                 defaultValue="all"
                                 optionFilterProp="children"
                                 onChange={this.onChangeConditional}
                                 onFocus={this.onFocus}
                                 onBlur={this.onBlur}
                                 filterOption={(input, option) =>
                                    option.props.children
                                       .toLowerCase()
                                       .indexOf(input.toLowerCase()) >= 0
                                 }
                                 style={{ width: "100%" }}
                              >
                                 <Option value={"all"}>Tất cả</Option>
                                 <Option value={"name"}>Tên của Tour</Option>
                                 <Option value={"landmark"}>Địa danh</Option>
                                 <Option value={"address"}>Địa chỉ</Option>
                                 <Option value={"type"}>Loại tour</Option>
                              </Select>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md ht-no-p-l align-items-center">
                     <div className="form-group">
                        <div className="form-field">
                           <Button
                              type="primary"
                              icon={<i className="fas fa-search" />}
                              size={sizeWindow}
                              block
                              onClick={this.onSearch}
                           >
                              {"Tìm kiếm Tour"}
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
