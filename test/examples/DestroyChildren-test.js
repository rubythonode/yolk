/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

function DestroyChildren () {
  const handleAdd = createEventHandler()
  const handleRemove = createEventHandler()

  const addable = handleAdd.scan(acc => acc.concat([<b />]), [])
  const removeable = handleRemove.scan(acc => acc.slice(1), [<p />, <p />, <p />, <p />, <p />])

  return (
    <div>
      <div id="children">
        {addable}
        {removeable}
      </div>
      <button onclick={handleAdd} id="add"></button>
      <button onclick={handleRemove} id="remove"></button>
    </div>
  )
}

describe(`destroying children`, () => {

  it(`throws them into an object pool`, () => {
    const component = <DestroyChildren />
    const node = document.createElement(`div`)
    render(component, node)

    const adder = node.querySelector(`#add`)
    const remover = node.querySelector(`#remove`)
    const children = node.querySelector(`#children`)

    assert.equal(children.innerHTML, `<b></b><p></p><p></p><p></p><p></p>`)

    remover.click()

    assert.equal(children.innerHTML, `<b></b><p></p><p></p><p></p>`)

    remover.click()
    remover.click()

    assert.equal(children.innerHTML, `<b></b><p></p>`)

    adder.click()
    adder.click()

    assert.equal(children.innerHTML, `<b></b><b></b><b></b><p></p>`)

  })

})
