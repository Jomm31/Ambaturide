"use client";
import { useState } from "react";
import "./Reviews.css";
import DriverHeader from '../../src/DriverHeader.jsx'

function StarRating({ rating = 5 }) {
  const [starCount] = useState(() => Array.from({ length: rating }, (_, i) => i + 1));

  return (
    <div className="starRating">
      {starCount.map((star) => (
        <svg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
          key={star}
          className="star"
        >
          <path
            d="M17.85 12.08C19.18 8.76 19.85 7.1 20.99 7.1C22.14 7.1 22.8 8.76 24.13 12.08L24.2 12.23C24.95 14.11 25.33 15.05 26.09 15.62C26.86 16.19 27.87 16.28 29.88 16.46L30.24 16.49C33.54 16.78 35.18 16.93 35.54 17.98C35.89 19.03 34.66 20.14 32.22 22.37L31.4 23.11C30.16 24.24 29.54 24.8 29.26 25.54C29.2 25.67 29.16 25.82 29.12 25.96C28.93 26.73 29.11 27.55 29.48 29.18L29.59 29.69C30.26 32.69 30.59 34.2 30.01 34.84C29.79 35.09 29.51 35.26 29.19 35.35C28.35 35.57 27.16 34.6 24.77 32.66C23.21 31.38 22.43 30.74 21.53 30.6C21.17 30.54 20.81 30.54 20.46 30.6C19.56 30.74 18.78 31.38 17.21 32.66C14.82 34.6 13.63 35.57 12.79 35.35C12.48 35.26 12.2 35.09 11.98 34.84C11.4 34.2 11.73 32.69 12.4 29.69L12.51 29.18C12.87 27.55 13.05 26.73 12.86 25.96C12.83 25.82 12.78 25.67 12.73 25.54C12.44 24.8 11.82 24.24 10.58 23.11L9.77 22.37C7.32 20.14 6.1 19.03 6.45 17.98C6.8 16.93 8.45 16.78 11.74 16.49L12.11 16.46C14.12 16.28 15.13 16.19 15.89 15.62C16.66 15.05 17.04 14.11 17.79 12.23L17.85 12.08Z"
            fill="#ECBA0B"
            stroke="#ECBA0B"
            strokeWidth="1.46"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ userName, date, isVerified, rating, avatarGradient, reviewText }) {
  return (
    <article className="reviewCard">
      <div className="reviewHeader">
        <div className="userInfo">
          <div className="userAvatar" style={{ background: avatarGradient }} />
          <div className="userDetails">
            <span className="userName">{userName}</span>
            <div className="userMeta">
              <div className="metaDot" />
              <span className="reviewDate">{date}</span>
              {isVerified && <div className="verifiedBadge">Verified</div>}
            </div>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>
      <p className="reviewText">{reviewText}</p>
    </article>
  );
}

function Reviews() {
  const reviewsData = [
    {
      id: 1,
      userName: "Justin Nabunturan",
      date: "22 Jul",
      isVerified: true,
      rating: 5,
      avatarGradient: "linear-gradient(45deg, #4caf50, #2196f3)",
      reviewText: "My driver was very professional and friendly throughout the trip. The car was clean, comfortable, and smelled fresh. He drove safely and followed the traffic rules, which made me feel at ease. He also knew the best route to avoid traffic, so I arrived earlier than expected. Overall, a smooth and pleasant ride, would definitely recommend this driver to others"
    },
    {
      id: 2,
      userName: "Justin Nabunturan",
      date: "22 Jul",
      isVerified: true,
      rating: 5,
      avatarGradient: "linear-gradient(45deg, #ff5722, #ff9800)",
      reviewText: "My driver was very professional and friendly throughout the trip. The car was clean, comfortable, and smelled fresh. He drove safely and followed the traffic rules, which made me feel at ease. He also knew the best route to avoid traffic, so I arrived earlier than expected. Overall, a smooth and pleasant ride, would definitely recommend this driver to others"
    }
  ];

  return (
    <>
      <DriverHeader/>
    <div className="pageContainer">
      <div className="contentWrapper">
        <main className="mainContent">
          <section className="reviewsContainer">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </section>
        </main>
      </div>
    </div>
    </>
  );
}

export default Reviews;