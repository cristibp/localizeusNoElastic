package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TranslationKeyMapperTest {

    private TranslationKeyMapper translationKeyMapper;

    @BeforeEach
    public void setUp() {
        translationKeyMapper = new TranslationKeyMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(translationKeyMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(translationKeyMapper.fromId(null)).isNull();
    }
}
