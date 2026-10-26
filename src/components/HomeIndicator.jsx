export default function HomeIndicator({ light = false }) {
  return <div className="home-ind" style={{ background: light ? '#fff' : '#000' }} />
}
