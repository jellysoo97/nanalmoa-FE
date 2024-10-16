import error from '@/assets/imgs/error.png'
import success from '@/assets/imgs/success.png'
import { Button } from '@/components/common'
import { path } from '@/routes/path'

const SignupResultPage = () => {
  const params = new URLSearchParams(window.location.search)
  const isSuccess = params.get('q') === 'true'

  return (
    <div className="container flex flex-col justify-center gap-y-10 px-6 py-2 sm:px-12">
      {isSuccess && (
        <div className="flex flex-col items-center gap-y-10">
          <img src={success} alt="success" />
          <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-xl font-bold">회원가입에 성공했습니다!</h2>
            <Button
              text="로그인 하기"
              className="w-full py-3"
              onClick={() => {
                window.location.href = path.login
              }}
            />
          </div>
        </div>
      )}

      {!isSuccess && (
        <div className="flex flex-col items-center gap-y-10">
          <img src={error} alt="error" />
          <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-xl font-bold">회원가입에 실패했습니다.</h2>
            <Button
              text="다시 시도하기"
              className="w-full py-3"
              onClick={() => {
                window.location.href = path.signup
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SignupResultPage
