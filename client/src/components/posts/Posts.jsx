import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";
import { makeReqest } from "../../axios";

const Posts = ({ userId }) => {
   const { isLoading, error, data } = useQuery(["posts"], () =>
      makeReqest.get("/posts?userId=" + userId).then((res) => {
         return res.data;
      })
   );

   return (
      <div className="posts">
         {error
            ? "Something went wrong!"
            : isLoading
            ? "loading"
            : data.map((post) => <Post post={post} key={post.id} />)}
      </div>
   );
};

export default Posts;
