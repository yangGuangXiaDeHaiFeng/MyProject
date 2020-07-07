
import React, { useState, useEffect } from 'react'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Reset,
  FormSpy,
  SchemaField,
  FormEffectHooks,
  createControllerBox,
  createFormActions,
  FormPath
} from '@formily/antd'
import { Input, FormStep, FormLayout, FormCard } from '@formily/antd-components'
import { Button, Spin } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const obj0=  {
  name:'step-1',
  title:'静态字段集',
  fields:[
    {
      name:"static-1",
      type:"string",
      x_component:"Input",
      title:"字段1",
    },
    {
      name:"static-2",
      type:"string",
      x_component:"Input",
      title:"字段2",
    }
    ,{
      name:"static-3",
      type:"string",
      x_component:"Input",
      title:"字段3",
    }
    ,{
      name:"static-4",
      type:"string",
      x_component:"Input",
      title:"字段4",
    }
  ]

};
const obj1= {
  name: 'step-2',
  title: '静态字段集2',
  fields: [
    {
      name: "static-5",
      type: "string",
      x_component: "Input",
      title: "字段5",
    },
    {
      name: "static-6",
      type: "string",
      x_component: "Input",
      title: "字段6",
    }
    , {
      name: "static-7",
      type: "string",
      x_component: "Input",
      title: "字段7",
    }
    , {
      name: "static-8",
      type: "string",
      x_component: "Input",
      title: "字段8",
    }
  ]
};
const obj2= {
  name: 'step-3',
  title: '静态字段集3',
  fields: [
    {
      name: "static-9",
      type: "string",
      x_component: "Input",
      title: "字段9",
    },
    {
      name: "static-10",
      type: "string",
      x_component: "Input",
      title: "字段10",
    }
    , {
      name: "static-11",
      type: "string",
      x_component: "Input",
      title: "字段11",
    }
    , {
      name: "static-12",
      type: "string",
      x_component: "Input",
      title: "字段12",
    }
  ]
};
const datas=[];
const actions = createFormActions()
const { onFormInit$ } = FormEffectHooks

const fetchSchema = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        type: 'object',
        properties: {
          'dynamic-1': {
            type: 'string',
            'x-component': 'input',
            title: '字段1'
          },
          'dynamic-2': {
            type: 'string',
            'x-component': 'input',
            title: '字段2'
          },
          'dynamic-3': {
            type: 'string',
            'x-component': 'input',
            title: '字段3'
          },
          'dynamic-4': {
            type: 'string',
            'x-component': 'input',
            title: '字段4'
          }
        }
      })
    }, 2000)
  })
}

const DynamicFields = createControllerBox('dynamics', ({ path }) => {
  const [schema, setSchema] = useState()

  useEffect(() => {
    fetchSchema().then(schema => {
      setSchema(schema)
    })
  }, [])

  if (!schema) {
    return (
      <div
        style={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <SchemaField
      path={FormPath.parse(path).parent()}
      schema={schema}
      onlyRenderProperties
    />
  )
})

const useBatchRequired = name => {
  const { setFieldState } = createFormActions()

  onFormInit$().subscribe(() => {
    setFieldState(name, state => {
      if (state.props.required === false) return
      state.required = true
    })
  })
}

const StepForm = () => {
  const dataSource=[
    { title: '步骤1', name: 'step-1' },
    { title: '步骤2', name: 'step-2' },
    { title: '步骤3', name: 'step-3' }
  ];
  datas.push(obj0)
  // datas.push(obj1)
  // datas.push(obj2)
  return(
    <Printer>
      <SchemaForm
        components={{ Input }}
        actions={actions}
        effects={() => {
          useBatchRequired('*')
        }}
      >
        <FormStep
          style={{ marginBottom: 20 }}
          dataSource={dataSource}
        />
        {
          dataSource&&dataSource.map((item,index)=>{
            if(datas[index]){
              return <Test index={index} t={datas[index]}/>
            }
    return <Test index={index}/>

          }

          )
        }
        <FormSpy
          selector={FormStep.ON_FORM_STEP_CURRENT_CHANGE}
          initialState={{
            step: { value: 0 }
          }}
          reducer={(state, action) => {
            switch (action.type) {
              case FormStep.ON_FORM_STEP_CURRENT_CHANGE:
                return { ...state, step: action.payload }
              default:
                return { step: { value: 0 } }
            }
          }}
        >
          {({ state }) => {
            return (
              <FormButtonGroup align="center">
                <Button
                  disabled={state.step.value === 0}
                  onClick={() => {
                    actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)
                  }}
                >
                  上一步
                </Button>
                <Button
                  type={state.step.value == 2 ? 'primary' : undefined}
                  onClick={() => {
                    if (state.step.value == 2) {
                      actions.submit()
                    } else {
                      actions.dispatch(FormStep.ON_FORM_STEP_NEXT)
                    }
                  }}
                >
                  {state.step.value == 2 ? '提交' : '下一步'}
                </Button>
                <Reset>重置</Reset>​
              </FormButtonGroup>
            )
          }}
        </FormSpy>
      </SchemaForm>
    </Printer>
  )
}
export default StepForm;

const Test=(props:any)=>{
  const {index,t}=props;
  const [item,setItem]=useState(t||{})
  console.log(index,'index');
  useEffect(()=>{
    setItem(index===0?obj1:obj2);
  },[index])
  if(JSON.stringify(item)!=='{}'){
    return <FormCard name={item.name} title={item.title}>
      {
        item.fields&& item.fields.map((i:any)=>
          <FormLayout labelCol={8} wrapperCol={10}>
            <Field
              name={i.name}
              type={i.type}
              x-component={i. x_component}
              title={i.title}
            />
          </FormLayout>
        )
      }
    </FormCard>
  }
  return<div>kk</div>
}
