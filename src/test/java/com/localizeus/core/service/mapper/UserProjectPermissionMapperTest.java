package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class UserProjectPermissionMapperTest {

    private UserProjectPermissionMapper userProjectPermissionMapper;

    @BeforeEach
    public void setUp() {
        userProjectPermissionMapper = new UserProjectPermissionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(userProjectPermissionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(userProjectPermissionMapper.fromId(null)).isNull();
    }
}
