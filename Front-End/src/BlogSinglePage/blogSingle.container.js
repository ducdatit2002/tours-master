import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";
import parseHtml from "html-react-parser";
import BlogRightContainer from "../BlogPage/blogRight.container";
import BlogNavigationContainer from "../BlogPage/blogNavigation.container";
import Cookies from "js-cookie";
import { Rate } from "antd";
import moment from "moment";

export default class BlogSingleContainer extends Component {
   componentDidMount() {
      window.scrollTo({
         top: 0,
         left: 0,
      });
      funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
   }

   componentWillReceiveProps(nextProps) {
      if (this.state.valueRate === undefined) {
         this.setState({ valueRate: nextProps.postById.vote });
      }
   }

   renderContentPost = (contentPost) => {
      if (contentPost) {
         return parseHtml(`${contentPost}`);
      }
      return null;
   };

   checkLogin = () => {
      const token = Cookies.get("token");
      const name = sessionStorage.getItem("name");
      const avatar = sessionStorage.getItem("avatar");

      return token && name && avatar;
   };

   constructor(props) {
      super(props);
      this.state = {
         vote: false,
         numVote: 131,
         valueRate: undefined,
         isLogin: this.checkLogin(),
      };
   }

   handleChange = (value) => {
      this.setState({ valueRate: value });
      this.props.handleVoteBlog(value);
   };
   onChangeVote = () => {
      this.setState({
         vote: !this.state.vote,
         numVote: this.state.vote
            ? this.state.numVote - 1
            : this.state.numVote + 1,
      });
   };
   render() {
      const { valueRate, isLogin } = this.state;
      const { postById, listPostNew, listPostViews } = this.props;
      const postDate = postById.dateEdited
         ? postById.dateEdited
         : postById.dateAdded;
      const postTags =
         postById.tags && postById.tags !== "undefined"
            ? JSON.parse(postById.tags.replace(/'/g, '"'))
            : [];
      return (
         <section className="ftco-section">
            <div className="container">
               <BlogNavigationContainer />

               <div className="row">
                  <div className="col-lg-8 ftco-animate">
                     <div className="ht-title-post-container">
                        <div className="ht-title">{postById.titlePost}</div>
                        <div className="ht-date-view-vote">
                           <div className="ht-date-view">
                              <i className="far fa-calendar-alt"></i>
                              {` `}
                              {moment(postDate).format(
                                 INDEX_CONSTANTS.DATE_TIME_FORMAT
                                    .DATE_MONTH_YEAR
                              )}
                              <i className="far fa-eye ml-3"></i>
                              {` `}
                              {postById.views}
                              <i className="far fa-star ml-3"></i>
                              {` `}
                              {postById.vote}
                           </div>
                           {/* <div
                              className={vote ? "ht-vote-up" : "ht-vote"}
                              onClick={this.onChangeVote}
                           >
                              {" "}
                              <i className="far fa-thumbs-up"></i> {numVote}
                           </div> */}
                           <div className="ht-rating">
                              {"ĐÁNH GIÁ "}
                              <span>
                                 <Rate
                                    allowClear={false}
                                    tooltips={INDEX_CONSTANTS.DESC_RATE}
                                    disabled={!isLogin}
                                    onChange={this.handleChange}
                                    value={valueRate}
                                 />
                                 {valueRate ? (
                                    <span className="ant-rate-text">
                                       {
                                          INDEX_CONSTANTS.DESC_RATE[
                                             valueRate - 1
                                          ]
                                       }
                                    </span>
                                 ) : (
                                    ""
                                 )}
                              </span>
                           </div>
                        </div>
                     </div>
                     <p>{postById.describe}</p>
                     {this.renderContentPost(postById.contentPost)}
                     <div className="tag-widget post-tag-container mb-2 mt-2">
                        <div className="tagcloud">
                           <div className="ht-tag-container-beautiful">
                              <i className="fas fa-tags"></i> Tags
                           </div>
                           {postTags &&
                              postTags.map((tag, index) => (
                                 <Link
                                    to="#"
                                    className="tag-cloud-link"
                                    key={index}
                                 >
                                    {tag}
                                 </Link>
                              ))}
                        </div>
                     </div>
                     <div className="pt-2 mt-2 mb-4 ht-rating-post">
                        ĐÁNH GIÁ BÀI VIẾT NÀY
                        <div className="ht-rating">
                           <span>
                              <Rate
                                 allowClear={false}
                                 tooltips={INDEX_CONSTANTS.DESC_RATE}
                                 onChange={this.handleChange}
                                 defaultValue={postById.vote}
                                 value={valueRate}
                              />
                              {postById.vote ? (
                                 <span className="ant-rate-text">
                                    {
                                       INDEX_CONSTANTS.DESC_RATE[
                                          postById.vote - 1
                                       ]
                                    }
                                 </span>
                              ) : (
                                 ""
                              )}
                           </span>
                        </div>
                     </div>

                     <div className="about-author d-flex p-4 bg-light">
                        <div className="bio mr-5">
                           <img
                              src="/images/person_1.jpg"
                              alt="#"
                              className="img-fluid mb-4"
                           />
                        </div>
                        <div className="desc">
                           <h3>ithoangtan</h3>
                           <p>
                              Create a beautiful blog that fits your style.
                              Choose from a selection of easy-to-use templates –
                              all with flexible layouts and hundreds of
                              background images – or design something new.
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* .col-md-8 */}
                  <div className="col-lg-4 sidebar ftco-animate col-md-4 ht-blog-right">
                     <BlogRightContainer
                        listPostNew={listPostNew}
                        listPostViews={listPostViews}
                        postTags={postTags}
                     />
                  </div>
               </div>
            </div>
         </section>
      );
   }
}
BlogSingleContainer.propTypes = {
   handleVoteBlog: PropTypes.func,
   postById: PropTypes.object,
   listPostNew: PropTypes.array,
   listPostViews: PropTypes.array,
};
