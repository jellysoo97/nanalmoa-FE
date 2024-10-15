import Divider from '../common/Divider'

type Props = {
  title: string
}

const SettingTitle = ({ title }: Props) => {
  return (
    <>
      <h1 className="pb-3 text-xl font-medium">{title}</h1>
      <Divider />
    </>
  )
}

export default SettingTitle
