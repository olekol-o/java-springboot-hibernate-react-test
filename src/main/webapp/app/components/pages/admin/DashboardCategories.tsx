import React, { Component } from 'react'
import {Button, Card, CardTitle, Col, Icon, Row, SideNav, SideNavItem, Table, TextInput} from "react-materialize"
import { NavLink } from 'react-router-dom'
import {inject, observer} from "mobx-react"
import Category from '../../../models/CategoryModel'
import M from 'materialize-css'
import {reaction} from "mobx";

@inject("commonStore", "categoryStore")
@observer
class DashboardCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {formMode: 'add'}
    }

    componentDidMount() {
        /* document.getElementById('categoryFormSideNav')
            .style
            .transform = 'translateX(0%)' */
        this.props.categoryStore.fetchCategories()
    }

    handleCategoryNameChange = e => {
        // e.preventDefault()
        // e.stopPropagation()
        this.props.categoryStore.setCategoryName(e.target.value)
    }

    handleCategoryEdit = (e, categoryId) => {
        this.state.formMode = 'edit'
        console.log(document.getElementById('categoryFormSideNav'))
        document.getElementById('categoryFormSideNav')
            .style
            .transform = 'translateX(105%)'
        console.log(document.getElementById('categoryFormSideNav'))
        const currentCategory =
            this.props.categoryStore.categories.find(c => c.id === categoryId)
        this.props.categoryStore.setCurrentCategory(currentCategory)
    }

    handleSubmitForm = e => {
        // предотвращаем отправку данных формы на сервер браузером
        // и перезагрузку страницы
        e.preventDefault()
        if (this.state.formMode === 'add') {
            this.props.categoryStore.add()
        } else {
            this.state.formMode = 'add'
            this.props.categoryStore.update()
        }
    }

    currentCategoryChanged = reaction(
        () => this.props.categoryStore.currentCategory.name,
        (currentCategoryName) => {
            console.log(currentCategoryName)
            M.updateTextFields()
            console.log(document.getElementById('categoryFormSideNav'))
            document.getElementById('categoryFormSideNav')
                .style
                .transform = 'translateX(105%)'
            console.log(document.getElementById('categoryFormSideNav'))
        }
    )

    render () {
        const { loading } = this.props.commonStore
        const { categories } = this.props.categoryStore
        const { currentCategory } =
            this.props.categoryStore.currentCategory
        return <Row>
            <h2>Categories</h2>
            <SideNav
                id='categoryFormSideNav'
                options={{
                    onCloseStart: (e) => {
                        console.log(e)
                    }
                }}
                trigger={
                    <Button
                        tooltip="Add a new category"
                        tooltipOptions={{
                            position: 'top'
                        }}
                        icon={<Icon>add</Icon>}
                    />
                }
            >
                <Col
                    s={12}
                >
                    <form>
                        <Row>
                            <Col s={12} >
                                <TextInput
                                    id="name"
                                    label={'category name'}
                                    validate
                                    value={this.props.categoryStore.currentCategory.name}
                                    onChange={this.handleCategoryNameChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Button
                                node="button"
                                waves="light"
                                disabled={loading}
                                onClick={this.handleSubmitForm}
                            >
                                Submit
                                <Icon right>
                                    send
                                </Icon>
                            </Button>
                        </Row>
                    </form>
                </Col>
            </SideNav>
            <Table>
                <thead>
                <tr>
                    <th data-field="id">ID</th>
                    <th data-field="name">Name</th>
                </tr>
                </thead>
                <tbody>
            {categories.map(category => {
                /* выводим на панель навигации список категорий*/
                return (
                    <tr>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <div data-category-id={category.id}>
                                <Button
                                    node="button"
                                    waves="light"
                                    onClick={(e) => {
                                        this.handleCategoryEdit(e, category.id)
                                    }}>
                                    <Icon>edit</Icon>
                                </Button>
                                <Button
                                    node="button"
                                    waves="light">
                                    <Icon>delete</Icon>
                                </Button>
                            </div>
                        </td>
                    </tr>
                )
                /*<Row>
                    <Col>
                        {category.id}
                    </Col>
                    <Col>
                        {category.name}
                    </Col>
                </Row>*/
            })}
                </tbody>
            </Table>
        </Row>
    }
}

export default DashboardCategories