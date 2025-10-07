import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';


const getInitials = (fullName) => {
  const [first, last] = fullName.split(" ");
  return (first[0] + last[0]).toUpperCase();
};

export const ProfileFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const { friends } = data;

  const sortedFriends = [...friends].sort((a, b) => {
    // Top friends go on top
    const aTop = Boolean(a.topFriend);
    const bTop = Boolean(b.topFriend);
    if (aTop !== bTop) return aTop ? -1 : 1;

    // Compare last names
    const [firstA, lastA] = a.name.split(' ');
    const [firstB, lastB] = b.name.split(' ');

    const cmpLast = lastA.toLowerCase().localeCompare(lastB.toLowerCase());
    if (cmpLast) return cmpLast;

    // Tie break by first name if necessary
    return firstA.toLowerCase().localeCompare(firstB.toLowerCase());
  });

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {sortedFriends.map((friend, index) => (
            <li className="profile-list-item fade-in" key={index}>
              <div className="profile-list-item-avatar">
                {friend.image ? (
                  <img src={friend.image}/>
                ) : (
                  <div className="profile-list-item-avatar-fallback">
                    {getInitials(friend.name)}
                  </div>
                )}
              </div>
              <div className="profile-list-item-info">
                {friend.topFriend && (
                  <span className="top-friend-flag" >★ Top friend</span>
                )}                
                <p className="page-paragraph">
                  {friend.name}
                </p>
                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
