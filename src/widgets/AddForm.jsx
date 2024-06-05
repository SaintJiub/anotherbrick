import {Button, DatePicker, Form, Input, Select} from "antd";
import {useCallback, useEffect, useState} from "react";
import moment from "moment";
import "../app/styles/App.css"
import {useSupabase} from "../shared/hooks/useSupabase.js";


const AddForm = () => {
    const [materials, setMaterials] = useState([]);
    const [objects, setObjects] = useState([]);
    const [form] = Form.useForm();
    const supabase = useSupabase();

    useEffect(() => {
        if (supabase) {
            supabase.from("purchased_materials").select("*").then(({data}) => {
                setMaterials(data);
            });

            supabase.from("object_specifications").select("*").then(({data}) => {
                setObjects(data);
            });
        }
    }, [supabase]);

    const handleSubmission = useCallback(
        (result) => {
            if (result.error) {
            } else {
                // Handle Success here
                form.resetFields();
                console.log("Success");
            }
        },
        [form]
    );

    const onSubmit = useCallback(async () => {
        let values;
        try {
            values = await form.getFieldsValue();
        } catch (errorInfo) {
            return;
        }
        values.date = moment(values.date).format("YYYY-MM-DD");
        console.log(values);

        supabase.from("deadline_guide").insert({
            name: values.object_name,
            date_deadline: values.date,
            plan_count: values.plan_count,
            plan_cost: values.plan_cost,
        }).then(handleSubmission);

    }, [form, handleSubmission, supabase]);

    return (
        <>
            <h3>Добавить объект в справочник крайних сроков обеспечивания материалами</h3>
            <Form form={form}

                  style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      alignItems: "flex-start",
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
                  }}
                  variant={"outlined"}
                  layout={"vertical"}
            >

                <Form.Item
                    className={"form-item"}
                    label="Имя объекта"
                    rules={[{ required: true, }]}
                    name="object_name">
                    <Select  >
                        {
                            objects.map((object) => (
                                <Select.Option key={object.id} value={object.name}>
                                    {object.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className={"form-item"}
                    rules={[{ required: true, }]}

                    label="DatePicker"
                    name="date">
                    <DatePicker variant={"outlined"}/>
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, type: "float",}]}

                    className={"form-item"}
                    label="Количество по плану"
                    name="plan_count">
                    <Input/>
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, type: "float",}]}

                    className={"form-item"}
                    label="Стоимость"
                    name="plan_cost">
                    <Input/>
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, }]}
                    className={"form-item"}
                    label="Название материала"
                    name="material_name">
                    <Select  >
                        {
                            materials.map((material) => (
                                <Select.Option key={material.id} value={material.name}>
                                    {material.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={onSubmit}>Отправить</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddForm;
