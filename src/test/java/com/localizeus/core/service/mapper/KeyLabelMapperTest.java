package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class KeyLabelMapperTest {

    private KeyLabelMapper keyLabelMapper;

    @BeforeEach
    public void setUp() {
        keyLabelMapper = new KeyLabelMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(keyLabelMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(keyLabelMapper.fromId(null)).isNull();
    }
}
