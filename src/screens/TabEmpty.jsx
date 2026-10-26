import StatusBar from '../components/StatusBar.jsx'
import HomeIndicator from '../components/HomeIndicator.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { Heart, Bell } from '../components/Icons.jsx'

const CONTENT = {
  favorites: { Icon: Heart, title: 'No favorites yet', text: "You haven't favorited any coffee yet." },
  notifications: { Icon: Bell, title: 'No notifications yet', text: "We'll let you know when your order or a new promo is on its way." },
}

// Destination for the Favorites / Notifications tabs of the bottom navigation.
export default function TabEmpty({ tab }) {
  const { Icon, title, text } = CONTENT[tab]
  return (
    <section className="screen tw-root tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-px-10 tw-pb-24 tw-text-center">
      <StatusBar />
      <Icon size={40} className="tw-text-coffee" />
      <h2 className="tw-text-lg tw-font-semibold">{title}</h2>
      <p className="tw-text-sm tw-text-[#a2a2a2]">{text}</p>
      <BottomNav />
      <HomeIndicator />
    </section>
  )
}
