import React, { Component } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tourActions from "../../_actions/tour.actions";

import { Link } from "react-router-dom";

import { Rate, Button, Statistic, Tooltip } from "antd";

import {
   API_ENDPOINT,
   DATE_TIME_FORMAT,
} from "../../_constants/index.constants";

import moment from "moment";
import NumberFormat from "react-number-format";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const dateFormat = "lll";
const { Countdown } = Statistic;

class BestTourContainer extends Component {
   state = { haveData: false, size: "default" };

   fetch = async () => {
      const { tourAllActions } = this.props;
      const {
         fetchListTourRequest,
         fetchListTourImageRequest,
         fetchTourByTimeRequest,
      } = tourAllActions;
      await fetchListTourImageRequest();
      await fetchTourByTimeRequest(
         moment().format(DATE_TIME_FORMAT.YEAR_MONTH_DATE)
      );
      await fetchListTourRequest();
   };

   componentWillMount() {
      const { listTour } = this.props;
      this.fetch();
      this.setState({
         listTour,
         haveData: true,
         size: window.innerWidth > 757.98 ? "default" : "small",
      });
   }

   renderBestTours() {
      let result = null;
      const { listTour, listImageTour } = this.props;
      if (this.state.haveData === true) {
         result = listTour.map((tour, index) => {
            let listImageTourDetail = listImageTour.filter(
               (imageTour) => imageTour.idTour === tour.idTour
            );
            tour.departureDay = moment(tour.departureDay).format(dateFormat);
            if (index < 8)
               return (
                  <div
                     key={index}
                     className={`carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${
                        index === 0 ? "active" : ""
                     }`}
                  >
                     <div className="project">
                        <div className="img">
                           <img
                              src={
                                 listImageTourDetail.length > 0
                                    ? `${
                                         API_ENDPOINT +
                                         listImageTourDetail[0].url
                                      }`
                                    : ``
                              }
                              className="img-fluid"
                              alt="best tour"
                           />
                           <div className="sale">
                              <Countdown
                                 value={tour.departureDay}
                                 valueStyle={
                                    this.state.size === "default"
                                       ? { fontSize: "1.1rem" }
                                       : { fontSize: "0.9rem" }
                                 }
                                 format="Còn Dd Hh m:s"
                              />
                              {/* {tour.sale !== 0 ? `${tour.sale}% sale` : null} */}
                           </div>
                        </div>
                        <div className="text ht-d-flex-col">
                           <h5 className="price">
                              <NumberFormat
                                 value={tour.price}
                                 displayType={"text"}
                                 thousandSeparator={true}
                                 prefix={"Giá từ "}
                                 suffix={"Đ"}
                              />
                           </h5>
                           <Link to="/tour">
                              Ở Đà Lạt còn 4 tour nữa. Xem ngay!
                           </Link>
                           <Link
                              className="ht-map-maker"
                              to={{
                                 pathname: `/tour/search/hcm`,
                                 state: {
                                    tour: tour,
                                 },
                              }}
                           >
                              <i className="fas fa-map-marker-alt"> </i>
                              {` ${tour.departureAddress}`}
                           </Link>
                           <h4 className="ht-name-tour">
                              <Link
                                 to={{
                                    pathname: `/tour-single/${tour.idTour}`,
                                    state: {
                                       tour: tour,
                                    },
                                 }}
                              >
                                 {tour.titleTour}
                              </Link>
                           </h4>
                           <div className="d-flex">
                              <Rate
                                 allowHalf
                                 tooltips={desc}
                                 disabled
                                 defaultValue={tour.votes}
                                 // character={<Icon type="star" />}
                                 //Phải làm tròn số với đơn vị 0.5
                                 size="small"
                                 className="mr-1 height-40"
                              ></Rate>{" "}
                              <div className="float-right ht-display-flex-start-center">
                                 {/* <div className="rate">
                                    <Link to="/tour">
                                       ({tour.views ? tour.views : 0} views)
                                    </Link>
                                 </div> */}
                              </div>
                           </div>
                        </div>
                        <div className="ht-best-tour-bottom">
                           <div className="ht-flex-center-col">
                              <p className="ht-mr-0">{tour.vocationTime}</p>
                              <p className="ht-mr-0">
                                 {moment(tour.departureDay).format(
                                    "hh:mm DD/MM/YYYY"
                                 )}
                              </p>
                           </div>
                           <Link
                              to={{
                                 pathname: `/book-tour/${tour.idTour}`,
                                 state: {
                                    tour: tour,
                                 },
                              }}
                           >
                              <Tooltip
                                 placement="bottom"
                                 title={
                                    <p className="ht-no-p-m">
                                       <i className="fas fa-couch"></i> còn 5
                                       chỗ
                                    </p>
                                 }
                              >
                                 <Button type="primary" className="float-right">
                                    ĐẶT NGAY
                                 </Button>
                              </Tooltip>
                           </Link>
                        </div>
                        <a
                           href={
                              listImageTourDetail.length > 0
                                 ? `${
                                      API_ENDPOINT + listImageTourDetail[0].url
                                   }`
                                 : `${API_ENDPOINT + `/img/imgdefault.gif`}`
                           }
                           target="_blank"
                           rel="noopener noreferrer"
                           className="icon image-popup d-flex justify-content-center align-items-center"
                        >
                           <span className="icon-expand" />
                        </a>
                     </div>
                  </div>
               );
            else return <></>;
         });
      } else {
         result = <div>Không có dữ liệu</div>;
      }
      return result;
   }

   render() {
      return (
         <section className="ftco-section">
            <div className="container">
               <div className="row justify-content-center pb-1 ht-more-container">
                  <Link className="ht-more" to="tour">
                     <Button type="dashed">Xem thêm...</Button>
                  </Link>
                  <div className="col-md-12 heading-section text-center ">
                     <h2 className="mb-1">Những TOUR hàng đầu</h2>
                     <p>Something! Câu nói hay về du lịch</p>
                  </div>
               </div>
               <div
                  id="bestTourCarousel"
                  className="carousel slide ftco-animate"
                  data-ride="carousel"
                  data-interval={4000}
               >
                  <div
                     className="carousel-inner row w-100 mx-auto"
                     role="listbox"
                  >
                     {this.renderBestTours()}
                  </div>
                  <a
                     className="carousel-control-prev ht-w-70"
                     href="#bestTourCarousel"
                     role="button"
                     data-slide="prev"
                  >
                     <span
                        className="carousel-control-prev-icon ht-control-preview-icon"
                        aria-hidden="true"
                     />
                     {/* <span className="sr-only">Previous</span> */}
                  </a>
                  <a
                     className="carousel-control-next text-faded ht-w-70"
                     href="#bestTourCarousel"
                     role="button"
                     data-slide="next"
                  >
                     <span
                        className="carousel-control-next-icon ht-control-preview-icon"
                        aria-hidden="true"
                     />
                     {/* <span className="sr-only">Next</span> */}
                  </a>
               </div>
            </div>
         </section>
      );
   }
}
BestTourContainer.propTypes = {
   classes: PropTypes.object,
   tourAllActions: PropTypes.shape({
      fetchListTourRequest: PropTypes.func,
      fetchListTourImageRequest: PropTypes.func,
      fetchTourByTimeRequest: PropTypes.func,
   }),
   listTour: PropTypes.array,
   listImageTour: PropTypes.array,
};

const mapStateToProps = (state) => {
   return {
      listTour: state.tour.listTour,
      listImageTour: state.tour.listImageTour,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      tourAllActions: bindActionCreators(tourActions, dispatch),
      //Bên trái chỉ là đặt tên thôi, bên phải là tourActions ở bên tour.action.js
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(BestTourContainer);
