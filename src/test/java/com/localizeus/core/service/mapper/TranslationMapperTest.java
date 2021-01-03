package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TranslationMapperTest {

    private TranslationMapper translationMapper;

    @BeforeEach
    public void setUp() {
        translationMapper = new TranslationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(translationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(translationMapper.fromId(null)).isNull();
    }
}
