import React from "react";
import "./Css/PassengerProfile.css";
import PassengerHeader from "./Header/PassengerHeader";

function PassengerProfile() {
  return (
    <>
      <PassengerHeader />
        <h1>Profile</h1>
        <h1>Passenger</h1>

        <p>Last Name</p>
        <div class="last-name"></div>
        
        <p>First Name</p>
        <div class="first-name"></div>

        <p>Gender</p>
        <div class="Gender"></div>

        <p>Birthdate</p>
        <input type="date" />

        <div>
            <img src="" alt="" />
            <img src="" alt="attachment" />
            <p>Profile</p>

        </div>
        <button>Change Password</button>

        <div class="change-password-container">
            <p>Current Password</p>
            <input type="text" />

            <p>New Password</p>
            <input type="text" />

            <p>Confirm New Password</p>
            <input type="text" />
        </div>

        <div>
            <h1>Privacy</h1>
            <img src="" alt="Phillipines flag" />
            <input type="text" />

            <p>Email Address</p>
            <input type="text" />

            <button>Confirm Change</button>
            
        </div>

        <div class="password-changed">
            <img src="" alt="Check" />
            <h1>Password Changed!</h1>
            <p>Your password successfully changed</p>

            <button>Back to Home</button>
        </div>

        <div class="email-changed"></div>
        <p>Your Email/ Contact No. sucessfully changed</p>

        <button>Back to Home</button>

    </>
  );
}

export default PassengerProfile;
