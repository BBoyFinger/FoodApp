import React from "react";
import { AiOutlineWechat } from "react-icons/ai";
import { getFirstCharacterUser } from "../../unitls";

function AllRepComment({ allrepcomment, showRepComment, id }) {
  return (
    <div className="all-comment-rep-list">
      <div className="arrow-up"></div>
      {allrepcomment.map((repComment, i) => (
        <div key={i} className="all-comment-rep-list-item">
          <div className="all-comment-info">
            {repComment.isAdmin ? (
              <div className="all-comment-info-name admin">
                <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png"></img>
              </div>
            ) : (
              <div className="all-comment-info-name">{getFirstCharacterUser(repComment.nameUser)}</div>
            )}
            {repComment.isAdmin ? (
              <strong>
                {repComment.nameUser} <span>QTV</span>
              </strong>
            ) : (
              <strong>{repComment.nameUser}</strong>
            )}
          </div>

          <div className="all-comment-content">{repComment.content}</div>

          <div className="all-comment-more">
            <a className="all-comment-more-chat" onClick={() => showRepComment(id)}>
              <AiOutlineWechat style={{ color: "#e11b1e" }} /> <p>Reply</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllRepComment;
