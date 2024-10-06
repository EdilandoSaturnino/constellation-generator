import { Star } from '@/types/constellation'

export const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, stars: Star[], starSize: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#FDB813'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'

  stars.forEach((star, index) => {
    ctx.beginPath()
    ctx.arc(star.x, star.y, starSize, 0, 2 * Math.PI)
    ctx.fill()

    if (index > 0) {
      ctx.beginPath()
      ctx.moveTo(stars[index - 1].x, stars[index - 1].y)
      ctx.lineTo(star.x, star.y)
      ctx.stroke()
    }
  })
}
