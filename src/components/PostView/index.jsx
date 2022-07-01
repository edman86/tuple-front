import React from "react";
import Announcement from "../Announcement";

const PostView = () => {
  return (
    <>
      <Announcement
        id={1}
        title="Lorem ipsum dolor"
        imageUrl="https://lastfm.freetls.fastly.net/i/u/770x0/218d9a35bf787bc1f5132c548d546565.jpg"
        user={{
          avatarUrl:
            "https://lastfm.freetls.fastly.net/i/u/770x0/218d9a35bf787bc1f5132c548d546565.jpg",
          fullName: "Bugs",
        }}
        createdAt={"2022 г."}
        viewsCount={150}
        tags={["lorem", "ipsum", "dolor"]}
        isFullPost
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
          Nulla, consectetur numquam? Sunt quod corrupti recusandae consequatur. 
          Odio laudantium, inventore iusto, 
          ad culpa non impedit, necessitatibus optio aspernatur deserunt mollitia ipsa.
        </p>
      </Announcement>
    </>
  );
};

export default PostView;