import ScreenSaver from '../../../components/next-routing/ScreenSaver/ScreenSaver'

async function ScreenSaverExercise({ params }) {
  const { color } = await params
  return (
    <main className="screen-saver-wrapper">
      <ScreenSaver color={color} />
    </main>)
}

export default ScreenSaverExercise