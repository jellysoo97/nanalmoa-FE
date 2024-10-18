import { MutableRefObject, useEffect, useState } from 'react'

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>
  photoRef: MutableRefObject<HTMLCanvasElement | null>
}

type TPhoto = {
  url: string
  file: File
}

export const usePhoto = ({ videoRef, photoRef }: Props) => {
  const [isDeviceAllowed, setIsDeviceAllowed] = useState<boolean>(false)
  const [photo, setPhoto] = useState<TPhoto | null>(null)

  useEffect(() => {
    let stream = null

    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: 640,
            height: 480,
          },
          audio: false,
        })

        setIsDeviceAllowed(true)

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
          }
        }
      } catch (error) {
        console.error(error)
        throw new Error('Unable to access camera')
      }
    }

    if (videoRef && !photo) {
      getMedia()
    }
  }, [photo, videoRef])

  const takePhoto = () => {
    const video = videoRef.current!
    const photo = photoRef.current!
    const ctx = photo?.getContext('2d')

    const photoWidth = 400
    const photoHeight = 400

    ctx?.drawImage(video, 0, 0, photoWidth, photoHeight)

    photo.toBlob((blob) => {
      if (blob) {
        const photoFile = new File([blob], 'photo.png', { type: 'image/png' })
        setPhoto({
          url: photo.toDataURL('image/png'),
          file: photoFile,
        })
      }
    })
  }

  return { photo, isDeviceAllowed, setPhoto, takePhoto }
}
