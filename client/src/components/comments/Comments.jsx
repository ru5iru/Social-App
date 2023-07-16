import { useContext, useState } from "react";
import { makeReqest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import moment from "moment";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Comments = ({ postId }) => {
   const [descr, setDescr] = useState("");

   const { currentUser } = useContext(AuthContext);

   const { isLoading, error, data } = useQuery("comments", () =>
      makeReqest.get("/comments?postId=" + postId).then((res) => {
         return res.data;
      })
   );

   const queryClient = useQueryClient();

   const mutation = useMutation(
      (newComment) => {
         return makeReqest.post("/comments", newComment);
      },
      {
         onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
         },
      }
   );

   const handleClick = async (e) => {
      e.preventDefault();
      mutation.mutate({ descr, postId });
      setDescr("");
   };

   return (
      <div className="comments">
         <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input
               type="text"
               placeholder="write a comment"
               value={descr}
               onChange={(e) => setDescr(e.target.value)
              }
            />
            <button onClick={handleClick}>Send</button>
         </div>

         {isLoading
            ? "Loading"
            : data.map((comment) => (
                 <div className="comment">
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                       <span>{comment.name}</span>
                       <p>{comment.descr}</p>
                    </div>
                    <span className="date">
                       {moment(comment.createdAt).fromNow()}
                    </span>
                 </div>
              ))}
      </div>
   );
};

export default Comments;
