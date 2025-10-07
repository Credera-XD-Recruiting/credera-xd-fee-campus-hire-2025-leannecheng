import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


const PinnedPostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const preview = post.post.slice(0, 100);
  const showToggle = post.post.length > 100;

  return (
    <div className="content-card">
      <div className="post-author fade-in">
        <div className="post-author-avatar fade-in"></div>
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

  if (isLoading) {
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
          <PinnedPostCard key={index} post={post} />
        ))}
      </div>
    </section>
  );
};