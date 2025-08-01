import {useState, useCallback} from 'react'
import {post} from '../../server'
import * as D from '../../data'
import {Button} from '../../theme/daisyui'

export default function PostTest() {
  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const postTest = useCallback(() => {
    post('/test', D.makeRandomCard())
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [])

  return (
    <section className="mt-4">
      <div className="flex justify-center mb-4">
        <Button onClick={postTest} className="btn-primary">
          POST
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </section>
  )
}
