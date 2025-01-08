# Dineware

Dineware is a modern and responsive food ordering platform designed to provide users with a seamless experience in exploring, ordering, and managing food items. The application includes robust authentication, dynamic product management, and interactive UI elements.

## Live

Visit: [dineware.web.app](https://dineware.web.app)

Backup: [dineware.surge.sh](https://dineware.surge.sh)

## Key Features

- **Authentication**: Firebase Authentication for login and registration, secured with JWT tokens to protect private routes and APIs.
- **Responsive Design**: Fully responsive layout for all devices, with dark/light theme toggle support.
- **Product Management**: CRUD functionality for food items, enabling users to create, update, and delete products dynamically.
- **Food Gallery**: Integrated with "Yet Another React Lightbox" for a stunning image gallery experience.
- **Search, Sort, Filter**: Advanced search, sorting, and filtering options on the "All Foods" page for better user experience.
- **Animations**: Smooth animations using Framer Motion and React Awesome Reveal for an engaging UI.
- **Sliders and Marquees**: Dynamic sliders using SwiperJS and marquees for showcasing food items and offers.
- **Real-time Updates**: Integrated with TanStack Query for efficient data fetching and caching.
- **Toast Notifications**: User-friendly feedback with React Hot Toast.

## Tech Stack

###

<div align="left">
  <img src="https://skillicons.dev/icons?i=react" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mongodb" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=firebase" height="40" alt="firebase logo"  />
</div>

###

## NPM Packages

- **[@tanstack/react-query](https://tanstack.com/query)**: For efficient server state management.
- **[axios](https://axios-http.com/)**: For handling API requests.
- **[firebase](https://firebase.google.com/)**: For authentication and backend services.
- **[moment](https://momentjs.com/)**: For date and time formatting.
- **[framer-motion](https://www.framer.com/motion/)**: For fluid animations.
- **[react-awesome-reveal](https://react-awesome-reveal.vercel.app/)**: For pre-built reveal animations.
- **[react-countup](https://react-countup.vercel.app/)**: For animated counters.
- **[react-fast-marquee](https://www.react-fast-marquee.com/)**: For smooth scrolling marquees.
- **[react-hot-toast](https://react-hot-toast.com/)**: For interactive toast notifications.
- **[react-icons](https://react-icons.github.io/react-icons/)**: For scalable vector icons.
- **[react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)**: For detecting element visibility.
- **[swiper](https://swiperjs.com/)**: For building modern sliders.
- **[yet-another-react-lightbox](https://github.com/igordanchenko/yet-another-react-lightbox)**: For a feature-rich image lightbox.
- **[react-router-dom](https://reactrouter.com/)**: For client-side routing.

## How to Run Locally

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/xyryc/Dineware-client.git
   cd Dineware-client
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Add Firebase configuration:**

   - Create a `.env.local` file in the root directory and add your Firebase config keys:

   ```bash
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_project_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    VITE_API_URL=backend_server_url
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app in your browser:**
   ```bash
   http://localhost:5173/
   ```

## Contribution

Feel free to fork the repository, make improvements, and submit a pull request. For major changes, open an issue first to discuss the proposed changes.
