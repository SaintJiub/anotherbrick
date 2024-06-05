import React, {useCallback} from 'react';
import {Button, Form, Input} from "antd";
import {useSupabase} from "../shared/hooks/useSupabase.js";

const AddScans = () => {
    const [form] = Form.useForm();
    const supabase = useSupabase();

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
        console.log(values);

        supabase.from("scans_of_invoices").insert({
            name: values.name,
            fact_count: values.fact_count,
            fact_cost: values.fact_cost,
        }).then(handleSubmission);

    }, [form, handleSubmission, supabase]);

    return (
        <>
            <h3>Добавить сканы счетов мануфактур</h3>
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
                    label="Имя. Просто имя"
                    rules={[{required: true,}]}
                    name="name">
                    <Input/>
                </Form.Item>

                <Form.Item
                    rules={[{required: true, type: "float", }]}

                    className={"form-item"}
                    label="Фактическое количество"
                    name="fact_count">
                    <Input/>
                </Form.Item>

                <Form.Item
                    rules={[{required: true, type: "float",}]}

                    className={"form-item"}
                    label="Фактическая стоимость"
                    name="fact_cost">
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={onSubmit}>Отправить</Button>
                </Form.Item>
            </Form>
        </>
    )
        ;
};

export default AddScans;
