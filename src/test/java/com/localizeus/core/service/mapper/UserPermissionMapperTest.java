package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class UserPermissionMapperTest {

    private UserPermissionMapper userPermissionMapper;

    @BeforeEach
    public void setUp() {
        userPermissionMapper = new UserPermissionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(userPermissionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(userPermissionMapper.fromId(null)).isNull();
    }
}
