import { useState, useEffect } from 'react'

export default function CopyCodeButton() {
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    const pres = document.querySelectorAll('.prose pre')
    pres.forEach((pre) => {
      const btn = document.createElement('button')
      btn.className = 'copy-code-btn'
      btn.textContent = 'Copy'
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || ''
        try {
          await navigator.clipboard.writeText(code)
          btn.textContent = 'Copied!'
          setCopied(pre)
          setTimeout(() => {
            btn.textContent = 'Copy'
            setCopied(null)
          }, 2000)
        } catch {
          btn.textContent = 'Failed'
        }
      })
      pre.appendChild(btn)
    })

    return () => {
      pres.forEach((pre) => {
        const btn = pre.querySelector('.copy-code-btn')
        if (btn) btn.remove()
      })
    }
  }, [])

  return null
}
