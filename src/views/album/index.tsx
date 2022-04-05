import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAlbum } from '@/api'
import Cover from '@/components/cover'
import { TracklistRow } from '@/components/tracklist'

const Album = () => {
  const { albumId } = useParams()

  const [album, setAlbum] = useState<any>({})
  const [songs, setSongs] = useState<any>([])

  // TODO: extract as an util
  const generateImgUrlWithSize = (url: string, size: string | number) => `${url}?param=${size}y${size}`

  const fetchData = () => {
    // TODO: route params albumId undefined?
    if (!albumId) return

    getAlbum(albumId as string).then((data) => {
      setAlbum(data.album)
      setSongs(data.songs)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (album && <div className="album-container w-4/5 m-auto">
    <div className="album-info flex">
      <Cover className="w-300px h-300px" imgUrl={generateImgUrlWithSize(album.picUrl, 1024)} />
      <div className="flex-1 flex flex-col ml-56px">
        <div className="text-56px leading-normal font-semibold">{album?.name}</div>
        <div className="mt-6 text-lg font-semibold">{album?.artist?.name}</div>
        <div className="mt-1 text-sm text-gray-700">{new Date(album?.publishTime).getFullYear()}·{album?.size}首歌曲</div>
        <p className="mt-6 text-sm text-gray-700 line-clamp-10 whitespace-pre-wrap">{album?.description}</p>
      </div>
    </div>

    <div className="album-songs mt-16px">
      {songs.map((song: any, index: number) => <TracklistRow key={song.id} {...song} index={index + 1} />)}
    </div>
  </div>)
}

export default Album