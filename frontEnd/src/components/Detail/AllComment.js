import { Col } from "antd";
import React, { useState } from "react";
import { AiFillLock, AiFillPushpin, AiOutlineWechat } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { pinCommentProduct, repCommentProduct } from "../../actions/product/ProductAction";
import { getFirstCharacterUser } from "../../unitls";
import AllRepComment from "./AllRepComment";

function AllComment(allComment) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const { userInfo } = useSelector((state) => state.userSignin);
  const [repValue, setRepValue] = useState("");
  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };
  const handleRepComment = (value) => {
    if (userInfo) {
      const comment = {
        idComment: repCmt.key,
        isAdmin: userInfo.isAdmin,
        content: repValue,
        nameUser: userInfo.name,
      };
      dispatch(repCommentProduct(id, comment));
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else alert("Please login");
  };

  const PinComment = (comment) => {
    const UpdateComment = { ...comment, status: "pin" };
    dispatch(pinCommentProduct(id, UpdateComment));
  };
  if(!allComment.allComment) return <React.Fragment></React.Fragment>;
  return (
    <Col span={18} xs={24} sm={24} md={18}>
      <div className="all-comment" style={allComment?.allComment.length > 0 ? { backgroundColor: "#fff" } : {}}>
        {allComment?.allComment &&
          allComment.allComment.map((comment, i) => (
            <div key={i} className="comment-item">
              <div>
                <div className="all-comment-info">
                  {comment?.isAdmin ? (
                    <div style={{ display: "flex" }}>
                      <div className="all-comment-info-name admin">
                        <img
                          src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png"
                          alt="logo"
                        />
                      </div>
                      <strong>
                        {comment?.author} <span>HTA</span>
                      </strong>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <div className="all-comment-info-name">{getFirstCharacterUser(comment?.author)}</div>
                      <strong>{comment?.author}</strong>
                    </div>
                  )}
                  {userInfo?.isAdmin ? (
                    <div className="comment-status">
                      <div className="comment-status-pin" onClick={() => PinComment(comment)}>
                        {comment.status === "pin" ? <AiFillLock /> : <AiFillPushpin />}
                      </div>
                    </div>
                  ) : (
                    <div className="comment-status">
                      <div className="comment-status-pin">{comment.status === "pin" ? <AiFillPushpin /> : ""}</div>
                    </div>
                  )}
                </div>
                <div className="all-comment-content">{comment.content}</div>
                <div className="all-comment-more">
                  <a className="all-comment-more-chat" onClick={() => showRepComment(comment._id)}>
                    <AiOutlineWechat style={{ color: "#e11b1e" }} /> <p>Reply</p>
                  </a>
                </div>
                {comment.replies.length > 0 ? (
                  <AllRepComment allrepcomment={comment.replies} showRepComment={showRepComment} id={comment._id} />
                ) : (
                  ""
                )}
              </div>
              {repCmt.status === true && repCmt.key === comment._id ? (
                <div
                  span={18}
                  xs={24}
                  md={18}
                  align="start"
                  style={{
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="comment-area" style={{ display: "flex", alignItems: "center" }}>
                    <img src="/images/login.webp"></img>

                    <textarea
                      placeholder="Please leave your questions, TMART will respond within 1 hour from 8:00 am - 10:00 pm every day."
                      rows={10}
                      cols={3}
                      vaule={repValue}
                      onChange={(e) => setRepValue(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="comment-send">
                    <button onClick={() => handleRepComment()}>Reply</button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </Col>
  );
}

export default AllComment;
