import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const AddContact = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addPerson] = useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            People: [...data.People, addPerson]
          }
        })
      }
    })
  }

  return (
    <Form
      name='add-contact-form'
      layout='inline'
      size='large'
      style={{ marginBottom: '40px', justifyContent:'center' }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name='firstName' rules={[{ required: true, message: 'Enter a first name' }]}>
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }>
            Add Contact
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddContact