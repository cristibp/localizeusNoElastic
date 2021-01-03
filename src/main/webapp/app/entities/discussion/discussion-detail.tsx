import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './discussion.reducer';
import { IDiscussion } from 'app/shared/model/discussion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiscussionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DiscussionDetail = (props: IDiscussionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { discussionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.discussion.detail.title">Discussion</Translate> [<b>{discussionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="localizeusNoElasticApp.discussion.value">Value</Translate>
            </span>
          </dt>
          <dd>{discussionEntity.value}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.discussion.refProject">Ref Project</Translate>
          </dt>
          <dd>{discussionEntity.refProjectId ? discussionEntity.refProjectId : ''}</dd>
        </dl>
        <Button tag={Link} to="/discussion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/discussion/${discussionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ discussion }: IRootState) => ({
  discussionEntity: discussion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionDetail);
