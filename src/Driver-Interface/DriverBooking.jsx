import { useState, useMemo } from 'react';
import './DriverBooking.css';
import DriverHeader from './Header/DriverHeader';

function DriverBooking() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      passengerName: 'Loremas, Joemire Dave',
      passengerImage: 'https://api.builder.io/api/v1/image/assets/TEMP/459501e809958136aa3a6b296472f35edb0bbbbf?width=230',
      origin: 'De Guzman St., Toril Proper, Toril',
      destination: 'UM Matina, Gravahan',
      date: 'Dec. 25, 2025',
      time: '5:00 PM',
      status: 'pending'
    },
    {
      id: 2,
      passengerName: 'Santos, Maria Cristina',
      passengerImage: 'https://api.builder.io/api/v1/image/assets/TEMP/459501e809958136aa3a6b296472f35edb0bbbbf?width=230',
      origin: 'Bangkkerohan Public Market',
      destination: 'Abreeza Mall, Bajada',
      date: 'Dec. 25, 2025',
      time: '6:30 PM',
      status: 'pending'
    }
  ]);

  const [searchLocation, setSearchLocation] = useState('');
  const [loadingId, setLoadingId] = useState(null);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter(booking => booking.status === 'pending')
      .filter(booking => 
        booking.origin.toLowerCase().includes(searchLocation.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchLocation.toLowerCase()) ||
        booking.passengerName.toLowerCase().includes(searchLocation.toLowerCase())
      );
  }, [bookings, searchLocation]);

  const handleAccept = async (id) => {
    setLoadingId(id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'accepted' } : booking
    ));
    setLoadingId(null);
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'rejected' } : booking
    ));
    setLoadingId(null);
  };

  const clearSearch = () => {
    setSearchLocation('');
  };

  const getInitials = (name) => {
    return name
      .split(', ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="driver-booking-container">
      <DriverHeader />
      
      <div className="booking-content">
        <div className="search-header">
          <div className="location-title">
            <div className="location-badge">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <h1>Toril Area</h1>
            </div>
            <span className="booking-count">{filteredBookings.length} pending {filteredBookings.length === 1 ? 'request' : 'requests'}</span>
          </div>

          <div className="search-bar">
            <div className="search-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location, destination, or passenger name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="search-input"
            />
            {searchLocation && (
              <button className="clear-search" onClick={clearSearch}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="passenger-info">
                  <div className="avatar-container">
                    <img 
                      src={booking.passengerImage} 
                      alt={booking.passengerName} 
                      className="passenger-image" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="avatar-fallback">
                      {getInitials(booking.passengerName)}
                    </div>
                  </div>
                  <div className="passenger-details">
                    <span className="label">Passenger</span>
                    <h3 className="passenger-name">{booking.passengerName}</h3>
                  </div>
                </div>
                <div className="booking-badge pending">Pending</div>
              </div>

              <div className="trip-details">
                <div className="route-info">
                  <div className="route-line">
                    <div className="route-dot origin"></div>
                    <div className="route-line-connector"></div>
                    <div className="route-dot destination"></div>
                  </div>
                  <div className="route-details">
                    <div className="route-item">
                      <span className="route-label">From</span>
                      <p className="route-text">{booking.origin}</p>
                    </div>
                    <div className="route-item">
                      <span className="route-label">To</span>
                      <p className="route-text">{booking.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="datetime-info">
                  <div className="datetime-item">
                    <div className="datetime-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="date-container">
                      <span className="datetime-label">Date</span>
                      <span className="datetime-value">{booking.date}</span>
                    </div>
                  </div>
                  <div className="datetime-item">
                    <div className="datetime-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="date-container">
                      <span className="datetime-label">Time</span>
                      <span className="datetime-value">{booking.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`btn-reject ${loadingId === booking.id ? 'loading' : ''}`}
                  onClick={() => handleReject(booking.id)}
                  disabled={loadingId !== null}
                >
                  {loadingId === booking.id ? (
                    <div className="button-spinner"></div>
                  ) : (
                    'Decline'
                  )}
                </button>
                <button 
                  className={`btn-accept ${loadingId === booking.id ? 'loading' : ''}`}
                  onClick={() => handleAccept(booking.id)}
                  disabled={loadingId !== null}
                >
                  {loadingId === booking.id ? (
                    <div className="button-spinner"></div>
                  ) : (
                    'Accept Ride'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="no-bookings">
            <div className="no-bookings-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm0 44c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z"/>
                <path d="M40 28H24v8h16v-8z"/>
              </svg>
            </div>
            <h3>No pending requests</h3>
            <p>
              {searchLocation 
                ? `No bookings found for "${searchLocation}"`
                : 'All booking requests have been processed'
              }
            </p>
            {searchLocation && (
              <button className="btn-clear-search" onClick={clearSearch}>
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverBooking;