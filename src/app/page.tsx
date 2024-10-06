'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/toaster'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Save, Trash2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useConstellation } from '@/hooks/use-constellation'
import { drawStars } from '@/utils/draw-stars'

export default function Home() {
  const { stars, constellationName, starSize, constellations, canvasRef, setConstellationName, setStarSize, handleCanvasClick, saveConstellation, deleteConstellation } = useConstellation()

  return (
    <div className='max-w-6xl mx-auto px-16 py-4 space-y-4 flex flex-col justify-center items-center content-center min-h-screen'>
      <div className='w-full flex justify-end mb-4'>
        <ThemeToggle />
      </div>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Gerador de Constelações Interativo</CardTitle>
          <CardDescription>Crie suas próprias constelações no céu noturno</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='create' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='create'>Criar Constelação</TabsTrigger>
              <TabsTrigger value='view'>Ver Constelações</TabsTrigger>
            </TabsList>
            <TabsContent value='create' className='space-y-4'>
              <div className='relative'>
                <canvas ref={canvasRef} width={600} height={400} onClick={handleCanvasClick} className='w-full border border-gray-300 bg-gray-900 cursor-crosshair rounded-md' aria-label='Área de criação de constelação' />
                <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded'>{stars.length} estrelas</div>
              </div>
              <div className='space-y-4'>
                <div className='flex space-x-2'>
                  <Input placeholder='Nome da Constelação' value={constellationName} onChange={(e) => setConstellationName(e.target.value)} aria-label='Nome da Constelação' />
                  <Button onClick={saveConstellation}>
                    <Save className='w-4 h-4 mr-2' />
                    Salvar
                  </Button>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='star-size'>Tamanho das Estrelas</Label>
                  <Slider id='star-size' min={1} max={5} step={0.5} value={[starSize]} onValueChange={(value) => setStarSize(value[0])} aria-label='Ajustar tamanho das estrelas' />
                </div>
              </div>
            </TabsContent>
            <TabsContent value='view'>
              <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {constellations.map((constellation, index) => (
                    <Card key={index} className='overflow-hidden'>
                      <CardHeader className='p-4'>
                        <CardTitle className='text-lg flex justify-between items-center'>
                          {constellation.name}
                          <Button variant='ghost' size='icon' onClick={() => deleteConstellation(index)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <canvas
                          width={200}
                          height={150}
                          ref={(canvas) => {
                            if (canvas) {
                              const ctx = canvas.getContext('2d')
                              if (ctx) {
                                drawStars(
                                  ctx,
                                  canvas,
                                  constellation.stars.map((star) => ({ x: star.x / 3, y: star.y / 3 })),
                                  starSize / 2
                                )
                              }
                            }
                          }}
                          className='bg-gray-900 w-full'
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
