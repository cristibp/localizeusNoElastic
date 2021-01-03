package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class DiscussionMapperTest {

    private DiscussionMapper discussionMapper;

    @BeforeEach
    public void setUp() {
        discussionMapper = new DiscussionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(discussionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(discussionMapper.fromId(null)).isNull();
    }
}
