import './style.css';
import { getProfileData } from '../../services/profile';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


const PinnedPostCard = ({ post, friends }) => {
  const [expanded, setExpanded] = useState(false);

  // Preview text for long posts
  const preview = post.post.slice(0, 100);
  const showToggle = post.post.length > 100;

  // Combine author name and look for a matching friend
  const authorFullName = `${post.authorFirstName} ${post.authorLastName}`;
  const matchingFriend = friends?.find(f => f.name === authorFullName);
  const authorImage = matchingFriend?.image || null;

  return (
    <div className="content-card">
      <div className="post-author fade-in">
        <div className="post-author-avatar fade-in">
          {authorImage ? (
            <img src={authorImage} />
          ) : (
            <div className="post-author-avatar-fallback">
              {post.authorFirstName[0]}
              {post.authorLastName[0]}
            </div>
          )}
        </div>
        <div className="post-author-info fade-in">
          <p className="page-paragraph">
            {post.authorFirstName} {post.authorLastName}
          </p>
          <p className="page-micro">
            {post.jobTitle} @ {post.companyName}
          </p>
          <p className="page-micro post-metadata">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            {" — "}
            {post.city}, {post.state}
          </p>
        </div>
      </div>

      <p className="page-body post-content fade-in">
        {expanded ? post.post : preview + (showToggle ? "..." : "")}
      </p>

      {showToggle && (
        <button
          className="see-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export const ProfilePosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  const { friendsData, isFriendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading || isFriendsLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const { pinnedPosts } = data;

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        {pinnedPosts.map((post, index) => (
          <PinnedPostCard key={index} post={post} friends={friendsData} />
        ))}
      </div>
    </section>
  );
};