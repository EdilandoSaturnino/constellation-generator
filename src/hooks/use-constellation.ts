import { useState, useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Star, Constellation } from '@/types/constellation'
import { drawStars } from '@/utils/draw-stars'

export const useConstellation = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [constellationName, setConstellationName] = useState('')
  const [starSize, setStarSize] = useState(2)
  const [constellations, setConstellations] = useState<Constellation[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      drawStars(ctx, canvas, stars, starSize)
    }
  }, [stars, starSize])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    setStars([...stars, { x, y }])
  }

  const saveConstellation = () => {
    if (stars.length < 2 || constellationName.trim() === '') {
      toast({
        title: 'Erro',
        description: 'Adicione pelo menos 2 estrelas e um nome para a constelação',
        variant: 'destructive',
      })
      return
    }
    setConstellations([...constellations, { stars, name: constellationName }])
    setStars([])
    setConstellationName('')
    toast({
      title: 'Sucesso',
      description: 'Sua constelação foi salva!',
    })
  }

  const deleteConstellation = (index: number) => {
    const newConstellations = [...constellations]
    newConstellations.splice(index, 1)
    setConstellations(newConstellations)
    toast({
      title: 'Constelação Removida',
      description: 'A constelação foi removida com sucesso.',
    })
  }

  return {
    stars,
    constellationName,
    starSize,
    constellations,
    canvasRef,
    setConstellationName,
    setStarSize,
    handleCanvasClick,
    saveConstellation,
    deleteConstellation,
  }
}
