import Divider from '../common/Divider'

type Props = {
  title: string
  button?: React.ReactElement
}

const SettingTitle = ({ title, button }: Props) => {
  return (
    <>
      <div className="flex">
        <h1 className="pb-3 text-xl font-medium">{title}</h1>
        {button && button}
      </div>
      <Divider />
    </>
  )
}

export default SettingTitle
