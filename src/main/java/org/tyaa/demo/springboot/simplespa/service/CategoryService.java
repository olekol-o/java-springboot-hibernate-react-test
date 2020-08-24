package org.tyaa.demo.springboot.simplespa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.tyaa.demo.springboot.simplespa.dao.CategoryHibernateDAO;
import org.tyaa.demo.springboot.simplespa.entity.Category;
import org.tyaa.demo.springboot.simplespa.model.CategoryModel;
import org.tyaa.demo.springboot.simplespa.model.ResponseModel;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryHibernateDAO dao;

    public ResponseModel create(CategoryModel categoryModel) {
        Category category =
            Category.builder().name(categoryModel.getName().trim()).build();
        dao.save(category);
        // Demo Logging
        // System.out.println(String.format("Category %s Created", category.getName()));
        return ResponseModel.builder()
            .status(ResponseModel.SUCCESS_STATUS)
            .message(String.format("Category %s Created", category.getName()))
            .build();
    }

    public ResponseModel update(CategoryModel categoryModel) {
        Category category =
            Category.builder()
                .id(categoryModel.getId())
                .name(categoryModel.getName())
                .build();
        dao.save(category);
        // Demo Logging
        System.out.println(String.format("Category %s Updated", category.getName()));
        return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("Category %s Updated", category.getName()))
                .build();
    }

    public ResponseModel getAll() {
        List<Category> categories = dao.findAll(Sort.by("id").descending());
        List<CategoryModel> categoryModels =
            categories.stream()
            .map(c ->
                CategoryModel.builder()
                    .id(c.getId())
                    .name(c.getName())
                    .build()
            )
            .collect(Collectors.toList());
        return ResponseModel.builder()
            .status(ResponseModel.SUCCESS_STATUS)
            .data(categoryModels)
            .build();
    }

    public ResponseModel delete(Long id) {
        Optional<Category> categoryOptional = dao.findById(id);
        if (categoryOptional.isPresent()){
            Category category = categoryOptional.get();
            dao.delete(category);
            return ResponseModel.builder()
                .status(ResponseModel.SUCCESS_STATUS)
                .message(String.format("Category #%s Deleted", category.getName()))
                .build();
        } else {
            return ResponseModel.builder()
                .status(ResponseModel.FAIL_STATUS)
                .message(String.format("Category #%d Not Found", id))
                .build();
        }
    }
}
