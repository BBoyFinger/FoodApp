import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BlogProduct, getproductById } from "../../../../actions/product/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./index.css";
function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const detailProduct = useSelector((state) => state.getProductById.product);

  const log = () => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());
      dispatch(
        BlogProduct(id, { blogContent }, () => {
          alert("Add review product success");
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getproductById(id));
  }, [dispatch, id]);
  return (
    <section id="review">
      <div className="review">
        <span className="review-title">Review </span>

        <div className="review-content">
          {detailProduct ? (
            <Editor
              apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
              language="vi"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={detailProduct?.blog}
              init={{
                height: 300,
                menubar: "file edit view insert format tools table tc help",
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          ) : (
            ""
          )}
          <button className="add-review-product" onClick={log}>
            Add Review Product
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewProduct;
